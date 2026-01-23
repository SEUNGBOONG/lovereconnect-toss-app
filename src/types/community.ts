export interface Post {
  id: number;
  title: string;
  content: string;
  writerNickname: string;
  isMine: boolean;
  createdAt: string;
}

export interface Comment {
  commentId: number;
  postId: number;
  content: string;
  isMine: boolean;
  writerId: number;
  writerNickname: string;
  createdAt: string;
  children: Comment[] | null;
}
